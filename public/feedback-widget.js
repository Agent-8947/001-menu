(function() {
  const config = JSON.parse(decodeURIComponent(escape(atob("eyJpZCI6InctejFqNnI4eG14IiwibmFtZSI6IkRlZmF1bHQgV2lkZ2V0IiwidGl0bGUiOiJOZWVkIGhlbHA/IiwiZGVzY3JpcHRpb24iOiJDaG9vc2UgeW91ciBwcmVmZXJyZWQgY29udGFjdCBtZXRob2QgYW5kIHdlIHdpbGwgZ2V0IGJhY2sgdG8geW91LiIsImNoYW5uZWxzIjpbeyJ0eXBlIjoidGVsZWdyYW0iLCJsYWJlbCI6IlRlbGVncmFtIiwiZW5hYmxlZCI6dHJ1ZSwicGxhY2Vob2xkZXIiOiJ1c2VybmFtZSIsImljb25Nb2RlIjoiZGVmYXVsdCJ9LHsidHlwZSI6IndoYXRzYXBwIiwibGFiZWwiOiJXaGF0c0FwcCIsImVuYWJsZWQiOnRydWUsInBsYWNlaG9sZGVyIjoiNzkwMDEyMzQ1NjciLCJpY29uTW9kZSI6ImRlZmF1bHQifSx7InR5cGUiOiJnbWFpbCIsImxhYmVsIjoiR21haWwiLCJlbmFibGVkIjp0cnVlLCJwbGFjZWhvbGRlciI6InlvdXJuYW1lIiwiaWNvbk1vZGUiOiJkZWZhdWx0In0seyJ0eXBlIjoicHJvdG9uIiwibGFiZWwiOiJQcm90b24gTWFpbCIsImVuYWJsZWQiOnRydWUsInBsYWNlaG9sZGVyIjoieW91cm5hbWUiLCJpY29uTW9kZSI6ImRlZmF1bHQifV0sInRoZW1lQ29sb3IiOiIjNGY0NmU1IiwicG9zaXRpb24iOiJib3R0b20tcmlnaHQiLCJjcmVhdGVkQXQiOjE3NjgwODAxODE4MzMsIndpZGdldEljb25Nb2RlIjoiZGVmYXVsdCIsIndpZGdldFNpemUiOjY0LCJ3aWRnZXRPdXRsaW5lV2lkdGgiOjAsIndpZGdldE91dGxpbmVDb2xvciI6IiMwMDAwMDAiLCJ3aWRnZXRCb3JkZXJSYWRpdXMiOjI0LCJiYWNrZ3JvdW5kVHlwZSI6InNvbGlkIiwidGhlbWVHcmFkaWVudCI6ImxpbmVhci1ncmFkaWVudCgxMzVkZWcsICM2MzY2ZjEgMCUsICNhODU1ZjcgMTAwJSkiLCJwYW5lbFN0eWxlIjoiY2xhc3NpYyIsInBhbmVsV2lkdGgiOjM0MCwiZGVzY3JpcHRpb25Sb3dzIjoyLCJjaGF0SWQiOiI3NzEzODYzMzciLCJib3RUb2tlbiI6IjgwMjcwNDk1MTc6QUFIZnNKNDE4VGg3a09KQ3VEckNMRFlFdEh2c09qelNQQ28ifQ=="))));
  
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const fa = document.createElement('link'); fa.rel = 'stylesheet';
    fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(fa);
  }
  if (!document.querySelector('script[src*="tailwindcss"]')) {
    const tw = document.createElement('script'); tw.src = 'https://cdn.tailwindcss.com';
    document.head.appendChild(tw);
  }

  const root = document.createElement('div');
  root.id = 'feedback-hub-root';
  document.body.appendChild(root);

  setTimeout(() => {
    root.innerHTML = `
      <div style="position:fixed; bottom:20px; right:20px; z-index:99999; font-family: sans-serif;">
        <button id="hub-trigger" class="shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center text-white cursor-pointer" 
                style="width:${config.widgetSize}px; height:${config.widgetSize}px; border-radius:${config.widgetBorderRadius}px; background:${config.backgroundType === 'gradient' ? config.themeGradient : config.themeColor};">
          ${config.widgetIconMode === 'custom' && config.customWidgetIconUrl 
            ? `<img src="${config.customWidgetIconUrl}" style="width:50%; height:50%; object-fit:contain;">`
            : `<i class="fa-solid fa-comments" style="font-size:24px;"></i>`
          }
        </button>
        <div id="hub-panel" class="hidden absolute bottom-full right-0 mb-4 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden" style="width:${config.panelWidth || 340}px;">
          <div class="p-6 text-white" style="background:${config.headerBgOverride || (config.backgroundType === 'gradient' ? config.themeGradient : config.themeColor)}">
             <h3 class="font-bold text-xl mb-1">${config.title}</h3>
             <p class="text-sm opacity-90">${config.description}</p>
          </div>
          <div class="p-4 space-y-3" style="background:${config.bodyBgOverride || '#f8fafc'}">
            ${config.channels.filter(c => c.enabled).map(c => `
              <a href="${c.type === 'telegram' ? 'https://t.me/' + c.placeholder : c.type === 'whatsapp' ? 'https://wa.me/' + c.placeholder : c.type === 'gmail' ? 'mailto:' + c.placeholder : '#'}" target="_blank" class="flex items-center gap-4 p-4 rounded-2xl bg-white border shadow-sm hover:translate-x-1 transition-all">
                <div class="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                  ${c.iconMode === 'custom' && c.customIconUrl 
                    ? `<img src="${c.customIconUrl}" class="w-full h-full object-cover rounded-xl">`
                    : `<i class="fa-brands fa-${c.type}"></i>`
                  }
                </div>
                <span class="font-bold text-sm text-slate-700">${c.label}</span>
              </a>
            `).join('')}
          </div>
        </div>
      </div>`;
      
    const trigger = document.getElementById('hub-trigger');
    const panel = document.getElementById('hub-panel');
    if(trigger && panel) trigger.onclick = () => panel.classList.toggle('hidden');
  }, 500);
})();