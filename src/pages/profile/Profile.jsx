import { useAuth } from "../../hooks/useStore";

export default function Profile() {
  const { user } = useAuth();
  const { data } = user || {};
  return (
    <div className="max-w-[1024px] mx-auto py-6 px-4">
      <div className="md:flex justify-between">
        <div className="">
          <img src={data.image} alt={data.username} />
          <h1 className="mt-4 font-bold text-xl">
            {data?.firstName.concat(" ", data.lastName)}
          </h1>
          <p className="mt-4 font-bold text-xl">{data.age}</p>
          <p className="mt-4 font-bold text-xl">
            Address: {data.address.address}
          </p>
          <p className="mt-4 font-bold text-xl">
            State: {data.address.state}
          </p>
          <p className="mt-4 font-bold text-xl">
            Country: {data.address.country}
          </p>
        </div>
        <div className="">
          <h1 className="mt-4 font-bold text-xl">Gender: {data?.gender}</h1>
          <p className="mt-4 font-bold text-xl">Phone: {data?.phone}</p>
          <p className="mt-4 font-bold text-xl">Department: {data?.company.department}</p>
          <p className="mt-4 font-bold text-xl">Title: {data?.company.title}</p>
          <p className="mt-4 font-bold text-xl">Role: {data?.role}</p>
          <p className="mt-4 font-bold text-xl">Email: {data?.email}</p>

        </div>
      </div>
    </div>
  );
}
