import { usePathname } from "next/navigation";

const categoryFilter = [
  { value: 'rinjani', label: 'Rinjani' },
  { value: 'landscape', label: 'Landscape' },
  { value: 'culture', label: 'Culture' },
];

const price = [
  { value: 'asc', label: 'Lowest' },
  { value: 'desc', label: 'Highest' },
];

const ratingFilter = [
  { value: 1, label: '1 Star' },
  { value: 2, label: '2 Star' },
  { value: 3, label: '3 Star' },
  { value: 4, label: '4 Star' },
  { value: 5, label: '5 Star' },
];

const statusFilter = [
  { value: true, label: 'Available' },
  { value: false, label: 'Unavailable' },
];

export default function Filter({
  children,
  category,
  onCategoryChange = () => { },
  rating,
  onRatingChange = () => { },
  status,
  onStatusChange = () => { } }
) {

  const path = usePathname()

  return (
    <div className="space-y-4 xl:w-56">
      {
        path === "/packages" ?
          <select className='w-full appearance-none py-1 px-2.5 rounded-md focus:outline-rinjaniVisitor-green md:text-base text-sm' value={category} onChange={onCategoryChange}>
            <option value="" disabled className="">Select Category Filter</option>
            {
              categoryFilter.map((item, index) => (
                <option className="" key={index} value={item.value}>{item.label}</option>
              ))
            }
          </select>
          : null
      }

      <select className='w-full appearance-none py-1 px-2.5 rounded-md focus:outline-rinjaniVisitor-green md:text-base text-sm' value={rating} onChange={onRatingChange}>
        <option value="" disabled>Select Rating Filter</option>
        {
          ratingFilter.map((item, index) => (
            <option key={index} value={item.value}>{item.label}</option>
          ))
        }
      </select>

      <select className='w-full appearance-none py-1 px-2.5 rounded-md focus:outline-rinjaniVisitor-green md:text-base text-sm' value={status} onChange={onStatusChange}>
        <option value="" disabled>Select Status Filter</option>
        {
          statusFilter.map((item, index) => (
            <option key={index} value={item.value}>{item.label}</option>
          ))
        }
      </select>

      {children}
    </div>
  );
}