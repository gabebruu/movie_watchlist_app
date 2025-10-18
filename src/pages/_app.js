import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="relative min-h-screen">
      <video
        autoPlay
        loop
        muted
        className="fixed inset-0 object-cover w-full h-full z-[-1]"
      >
        <source src="/images/movie.horror.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Component {...pageProps} />
    </div>
  );
}
