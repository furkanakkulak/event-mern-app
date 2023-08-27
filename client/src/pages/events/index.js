import { useEvent } from '@/context';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const AllEvents = () => {
  const router = useRouter();
  const { query } = router;
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState(query.search || '');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedType, setSelectedType] = useState(router.query.type || '');
  const [filterByCategories, setFilterByCategories] = useState(false);
  const [filterByTypes, setFilterByTypes] = useState(false);
  const { fetchAllEvents, events } = useEvent();

  useEffect(() => {
    if (events.length === 0) {
      fetchAllEvents();
    }
    if (events) {
      filterData(events);
    }
  }, [events, selectedCategories]);

  useEffect(() => {
    setSelectedCategories(router.query.category?.split(',') || []);
    setSelectedType(router.query.type || '');
    setSearchTerm(router.query.search || '');
  }, [router.query.category, router.query.type, router.query.search]);

  useEffect(() => {
    const results = filteredEvents.filter((event) =>
      ['name', 'city', 'location'].some((prop) =>
        event[prop].toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
      )
    );
    setSearchResults(results);
  }, [searchTerm, filteredEvents]);

  const filterData = (data) => {
    const filteredEvents = data.filter(
      (event) =>
        (selectedCategories.length === 0 ||
          selectedCategories.includes(event.category)) &&
        (!selectedType || selectedType === 'all' || event.type === selectedType)
    );
    setFilteredEvents(filteredEvents);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    const updatedCategories = selectedCategories.includes(selectedCategory)
      ? selectedCategories.filter((category) => category !== selectedCategory)
      : [...selectedCategories, selectedCategory];

    setSelectedCategories(updatedCategories);

    router.push({
      pathname: '/events/all',
      query: {
        ...router.query,
        category: updatedCategories.join(','),
        type: selectedType || undefined,
      },
    });
  };

  const handleTypeChange = (newType) => {
    setSelectedType(newType);
    router.push({
      pathname: '/events/all',
      query: {
        ...router.query,
        type: newType,
        category: selectedCategories.join(','),
      },
    });
  };

  const handleSearch = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    router.push({
      pathname: '/events/all',
      query: { ...query, search: newSearchTerm },
    });
  };

  const handleSortChange = (e) => setSortBy(e.target.value);
  const handleSortOrderChange = (e) => setSortOrder(e.target.value);

  const sortedResults = searchResults.sort((a, b) => {
    const sortOrderFactor = sortOrder === 'asc' ? 1 : -1;
    if (sortBy === 'date')
      return sortOrderFactor * (new Date(a.startDate) - new Date(b.startDate));
    if (sortBy === 'city')
      return sortOrderFactor * a.city.localeCompare(b.city);
  });

  const categoryValues = ['concerts', 'sports', 'theaters'];
  const renderNoEventsMessage = <p>No events are available at the moment.</p>;

  const toggleFilter = (setState) => () => setState((prevState) => !prevState);

  return (
    <main>
      <div className="page-header">
        <h1 className="title">All Events</h1>
        <p className="subtitle">Browse and filter upcoming events.</p>
      </div>
      <div className="page-content py-8">
        <div className="flex justify-between gap-3">
          <div className="relative">
            <Button
              variant="outlined"
              color="secondary"
              className="px-3 py-1.5 text-xs"
              onClick={toggleFilter(setFilterByCategories)}
            >
              Filter By Categories
            </Button>
            {filterByCategories && (
              <div className="absolute z-10 bg-light-bg dark:bg-dark-bg border border-[#f4f4f4] dark:border-[#222222] p-auto w-full px-2 py-4 flex flex-col gap-y-3 shadow-2xl">
                {categoryValues.map((categoryValue) => (
                  <div key={categoryValue}>
                    <label className="flex gap-x-3">
                      <input
                        type="checkbox"
                        value={categoryValue}
                        checked={selectedCategories.includes(categoryValue)}
                        onChange={handleCategoryChange}
                      />
                      {categoryValue.charAt(0).toUpperCase() +
                        categoryValue.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <Button
              variant="outlined"
              color="secondary"
              className="px-3 py-1.5 text-xs"
              onClick={toggleFilter(setFilterByTypes)}
            >
              Filter By Event Type
            </Button>
            {filterByTypes && (
              <div className="absolute z-10 bg-light-bg dark:bg-dark-bg border border-[#f4f4f4] dark:border-[#222222] p-auto w-full px-2 py-4 flex flex-col gap-y-3 shadow-2xl">
                {[
                  { value: 'all', label: 'All Events' },
                  { value: 'future', label: 'Future Events' },
                  { value: 'past', label: 'Past Events' },
                ].map((type) => (
                  <div key={type.value}>
                    <label className="flex gap-x-3">
                      <input
                        type="checkbox"
                        value={type.value}
                        checked={selectedType === type.value}
                        onChange={() => {
                          toggleFilter(setFilterByTypes)();
                          handleTypeChange(type.value);
                        }}
                      />
                      {type.label}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center py-3 gap-y-3">
          <input
            type="text"
            placeholder="Search"
            className="w-full md:w-1/3 px-4 py-2 border-none rounded-full border bg-[#f4f4f4] dark:bg-[#333] dark:text-white focus:outline-[#333] dark:focus:outline-[#f4f4f4]"
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="flex items-center gap-5">
            <div>
              <label>Sort By: </label>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="bg-transparent dark:text-white focus:outline-[#333] dark:focus:outline-[#f4f4f4]"
              >
                <option value="date">Date</option>
                <option value="city">City</option>
              </select>
            </div>
            <div>
              <label>Sort Order: </label>
              <select
                value={sortOrder}
                onChange={handleSortOrderChange}
                className="bg-transparent dark:text-white focus:outline-[#333] dark:focus:outline-[#f4f4f4]"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedResults.length === 0 ? (
            <p>
              {searchTerm
                ? 'No events match your search criteria.'
                : 'No events are available at the moment.'}
            </p>
          ) : (
            sortedResults.map((event, index) => (
              <div
                className="slider"
                key={index}
              >
                <Link
                  href={`/events/${event._id}`}
                  className="relative"
                  passHref
                >
                  <Image
                    className="slider-img scale-[99%] transform hover:-translate-1 hover:scale-100 w-full h-[250px] object-cover"
                    src={`http://localhost:4000/images/${event.images[0]}`}
                    width={600}
                    height={400}
                    alt={event.description}
                  />
                  <h1 className="slider-title">{event.name}</h1>
                  <p className="slider-date !right-auto !left-2">
                    {event.city}
                  </p>
                  <p
                    className={`slider-date text-dark-txt dark:text-light-txt ${
                      event.type === 'future' ? '!bg-secondary' : '!bg-primary'
                    }`}
                  >
                    {dayjs(
                      event.type === 'future' ? event.startDate : event.endDate
                    ).format('DD/MM/YYYY HH:mm')}
                  </p>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default AllEvents;