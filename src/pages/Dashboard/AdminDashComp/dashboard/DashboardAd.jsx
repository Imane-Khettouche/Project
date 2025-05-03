import{ Aside ,Profile}from "../";


function DashboardAd() {
  return (
    <div className="flex h-screen">
      <Aside />
      <main className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-center">لوحة الطالب</h1>
        </div>
        <Profile />
        {/* You can add more student components below (e.g. Notifications, Quotes, etc.) */}
      </main>
    </div>
  );
}

export default DashboardAd;
