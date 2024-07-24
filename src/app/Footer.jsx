import Script from "next/script";

export default function Footer() {

  return (
    <div>
      <Script
        src="assets/js/main-js/main.min.js"
        strategy="beforeInteractive"
      />
    </div>
  );
}
