export default function SkeletonLoader() {
  return (
    <div>
      <div className="animate-pulse h-56 rounded-t-xl w-full bg-slate-200"></div>
      <div className=" h-48 rounded-b w-full bg-slate-100">
        <div className="px-10 py-4">
          <div className="w-full h-10 bg-slate-200 rounded animate-pulse"></div>
          <div className="h-5 w-24 bg-slate-200 mt-3 rounded-lg"></div>
          <div className="h-5 w-48 bg-slate-200 mt-3 rounded-lg"></div>
          <div className="h-5 w-48 bg-slate-200 mt-3 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
