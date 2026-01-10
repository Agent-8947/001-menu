(function() {
  /**
   * Feedback Hub: Autonomous Bundle
   * This script carries its own configuration and injects the widget.
   */
  const internalConfig = JSON.parse(decodeURIComponent(escape(atob("eyJpZCI6InctaTRveDZheTFvIiwibmFtZSI6IkRlZmF1bHQgV2lkZ2V0IiwidGl0bGUiOiJOZWVkIGhlbHA/IiwiZGVzY3JpcHRpb24iOiJDaG9vc2UgeW91ciBwcmVmZXJyZWQgY29udGFjdCBtZXRob2QgYW5kIHdlIHdpbGwgZ2V0IGJhY2sgdG8geW91LiIsImNoYW5uZWxzIjpbeyJ0eXBlIjoidGVsZWdyYW0iLCJsYWJlbCI6IlRlbGVncmFtIiwiZW5hYmxlZCI6dHJ1ZSwicGxhY2Vob2xkZXIiOiJ1c2VybmFtZSIsImljb25Nb2RlIjoiZGVmYXVsdCJ9LHsidHlwZSI6IndoYXRzYXBwIiwibGFiZWwiOiJXaGF0c0FwcCIsImVuYWJsZWQiOnRydWUsInBsYWNlaG9sZGVyIjoiNzkwMDEyMzQ1NjciLCJpY29uTW9kZSI6ImRlZmF1bHQifSx7InR5cGUiOiJnbWFpbCIsImxhYmVsIjoiR21haWwiLCJlbmFibGVkIjp0cnVlLCJwbGFjZWhvbGRlciI6InlvdXJuYW1lIiwiaWNvbk1vZGUiOiJkZWZhdWx0In0seyJ0eXBlIjoicHJvdG9uIiwibGFiZWwiOiJQcm90b24gTWFpbCIsImVuYWJsZWQiOnRydWUsInBsYWNlaG9sZGVyIjoieW91cm5hbWUiLCJpY29uTW9kZSI6ImRlZmF1bHQifV0sInRoZW1lQ29sb3IiOiIjNGY0NmU1IiwicG9zaXRpb24iOiJib3R0b20tcmlnaHQiLCJjcmVhdGVkQXQiOjE3NjgwNzAzMjMwNzIsIndpZGdldEljb25Nb2RlIjoiZGVmYXVsdCIsIndpZGdldFNpemUiOjY0LCJ3aWRnZXRPdXRsaW5lV2lkdGgiOjAsIndpZGdldE91dGxpbmVDb2xvciI6IiMwMDAwMDAiLCJ3aWRnZXRCb3JkZXJSYWRpdXMiOjI0LCJiYWNrZ3JvdW5kVHlwZSI6InNvbGlkIiwidGhlbWVHcmFkaWVudCI6ImxpbmVhci1ncmFkaWVudCgxMzVkZWcsICM2MzY2ZjEgMCUsICNhODU1ZjcgMTAwJSkiLCJwYW5lbFN0eWxlIjoiY2xhc3NpYyIsInBhbmVsV2lkdGgiOjM0MCwiZGVzY3JpcHRpb25Sb3dzIjoyLCJoZWFkZXJCZ092ZXJyaWRlIjoiIzAwMDAwMCIsImNoYXRJZCI6Ijc3MTM4NjMzNyIsImJvdFRva2VuIjoiODAyNzA0OTUxNzpBQUhmc0o0MThUaDdrT0pDdURyQ0xEWUV0SHZzT2p6U1BDbyJ9"))));
  window.WIDGET_CONFIG = internalConfig;

  // 1. Inject Font Awesome
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const fa = document.createElement('link');
    fa.rel = 'stylesheet';
    fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(fa);
  }

  // 2. Inject Tailwind CDN
  if (!document.querySelector('script[src*="tailwindcss"]')) {
    const tw = document.createElement('script');
    tw.src = 'https://cdn.tailwindcss.com';
    document.head.appendChild(tw);
  }

  // 3. Create Root Container
  let container = document.getElementById('feedback-hub-root');
  if (!container) {
    container = document.createElement('div');
    container.id = 'feedback-hub-root';
    document.body.appendChild(container);
  }

  // 4. Load the Main Application logic from the designated host
  // NOTE: For this bundle to work, your built project must be accessible at the hostUrl.
  const mainScript = document.createElement('script');
  mainScript.src = "/index.tsx"; 
  mainScript.type = "module";
  document.body.appendChild(mainScript);

  console.log('Feedback Hub: Bundle initialized successfully');
})();