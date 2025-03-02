import Header from "../component/Header";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-grow flex flex-col">
        <div className="flex-grow "> </div>
      </div>

      <div className="flex flex-col">
        <div
          className="w-full h-2"
          style={{
            background: "linear-gradient(to right, #4a90e2, #e94e77, #f8c4d3)",
          }}
        ></div>
      </div>
    </div>
  );
}
