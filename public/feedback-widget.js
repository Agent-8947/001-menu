(function() {
  var config = JSON.parse(decodeURIComponent(escape(atob("eyJpZCI6Inctanp0bjFhaGxtIiwibmFtZSI6IkRlZmF1bHQgV2lkZ2V0IiwidGl0bGUiOiJOZWVkIGhlbHA/IiwiZGVzY3JpcHRpb24iOiJDaG9vc2UgeW91ciBwcmVmZXJyZWQgY29udGFjdCBtZXRob2QgYW5kIHdlIHdpbGwgZ2V0IGJhY2sgdG8geW91LiIsImNoYW5uZWxzIjpbeyJ0eXBlIjoidGVsZWdyYW0iLCJsYWJlbCI6IlRlbGVncmFtIiwiZW5hYmxlZCI6dHJ1ZSwicGxhY2Vob2xkZXIiOiJ1c2VybmFtZSIsImljb25Nb2RlIjoiZGVmYXVsdCJ9LHsidHlwZSI6IndoYXRzYXBwIiwibGFiZWwiOiJXaGF0c0FwcCIsImVuYWJsZWQiOnRydWUsInBsYWNlaG9sZGVyIjoiNzkwMDEyMzQ1NjciLCJpY29uTW9kZSI6ImRlZmF1bHQifSx7InR5cGUiOiJnbWFpbCIsImxhYmVsIjoiR21haWwiLCJlbmFibGVkIjp0cnVlLCJwbGFjZWhvbGRlciI6InlvdXJuYW1lIiwiaWNvbk1vZGUiOiJkZWZhdWx0In0seyJ0eXBlIjoicHJvdG9uIiwibGFiZWwiOiJQcm90b24gTWFpbCIsImVuYWJsZWQiOnRydWUsInBsYWNlaG9sZGVyIjoieW91cm5hbWUiLCJpY29uTW9kZSI6ImRlZmF1bHQifV0sInRoZW1lQ29sb3IiOiIjNGY0NmU1IiwicG9zaXRpb24iOiJib3R0b20tcmlnaHQiLCJjcmVhdGVkQXQiOjE3NjgwODIwNzQxMjksIndpZGdldEljb25Nb2RlIjoiZGVmYXVsdCIsIndpZGdldFNpemUiOjY0LCJ3aWRnZXRPdXRsaW5lV2lkdGgiOjAsIndpZGdldE91dGxpbmVDb2xvciI6IiMwMDAwMDAiLCJ3aWRnZXRCb3JkZXJSYWRpdXMiOjI0LCJiYWNrZ3JvdW5kVHlwZSI6InNvbGlkIiwidGhlbWVHcmFkaWVudCI6ImxpbmVhci1ncmFkaWVudCgxMzVkZWcsICM2MzY2ZjEgMCUsICNhODU1ZjcgMTAwJSkiLCJwYW5lbFN0eWxlIjoiY2xhc3NpYyIsInBhbmVsV2lkdGgiOjM0MCwiZGVzY3JpcHRpb25Sb3dzIjoyLCJjaGF0SWQiOiI3NzEzODYzMzciLCJib3RUb2tlbiI6IjgwMjcwNDk1MTc6QUFIZnNKNDE4VGg3a09KQ3VEckNMRFlFdEh2c09qelNQQ28ifQ=="))));
  
  // 1. Подключение стилей
  if (!document.querySelector('link[href*="font-awesome"]')) {
    var fa = document.createElement('link'); fa.rel = 'stylesheet';
    fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(fa);
  }
  if (!document.querySelector('script[src*="tailwindcss"]')) {
    var tw = document.createElement('script'); tw.src = 'https://cdn.tailwindcss.com';
    document.head.appendChild(tw);
  }

  // 2. Создание контейнера
  var root = document.createElement('div');
  root.id = 'feedback-hub-root';
  document.body.appendChild(root);

  // Хелпер для иконок
  var getIcon = function(type) {
      if (type === 'gmail') return 'fa-brands fa-google';
      if (type === 'proton') return 'fa-solid fa-envelope';
      return 'fa-brands fa-' + type;
  };

  setTimeout(function() {
    root.innerHTML = `
      <div style="position:fixed; bottom:20px; right:20px; z-index:99999; font-family: sans-serif;">
        
        <button id="hub-trigger" class="shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center text-white cursor-pointer" 
                style="width:${config.widgetSize}px; height:${config.widgetSize}px; border-radius:${config.widgetBorderRadius}px; background:${config.backgroundType === 'gradient' ? config.themeGradient : config.themeColor};">
          ${config.widgetIconMode === 'custom' && config.customWidgetIconUrl 
            ? `<img src="${config.customWidgetIconUrl}" style="width:50%; height:50%; object-fit:contain;">`
            : `<i class="fa-solid fa-comments" style="font-size:24px;"></i>`
          }
        </button>

        <div id="hub-panel" class="hidden absolute bottom-full right-0 mb-4 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col" style="width:${config.panelWidth || 340}px;">
          
          <div class="p-6 text-white relative" style="background:${config.headerBgOverride || (config.backgroundType === 'gradient' ? config.themeGradient : config.themeColor)}">
             <h3 class="font-bold text-xl mb-1">${config.title}</h3>
             <p class="text-sm opacity-90">${config.description}</p>
             <button id="hub-close" class="absolute top-4 right-4 text-white/80 hover:text-white"><i class="fa-solid fa-xmark"></i></button>
          </div>

          <div class="p-5 space-y-4" style="background:${config.bodyBgOverride || '#f8fafc'}">
            
            <div id="hub-form-container" class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div class="mb-3">
                    <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Ваши контакты</label>
                    <input type="text" id="hub-contact" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="Email или Telegram">
                </div>
                <div class="mb-3">
                    <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Сообщение</label>
                    <textarea id="hub-message" rows="3" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="Чем мы можем помочь?"></textarea>
                </div>
                <button id="hub-send-btn" class="w-full py-3 rounded-xl text-white font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                        style="background:${config.backgroundType === 'gradient' ? config.themeGradient : config.themeColor}">
                    <span>Отправить</span>
                    <i class="fa-solid fa-paper-plane"></i>
                </button>
                <div id="hub-status" class="text-center text-xs font-bold mt-2 hidden"></div>
            </div>

            <div class="grid grid-cols-4 gap-2">
            ${config.channels.filter((c: any) => c.enabled).map((c: any) => `
              <a href="${c.type === 'telegram' ? 'https://t.me/' + c.placeholder : c.type === 'whatsapp' ? 'https://wa.me/' + c.placeholder : c.type === 'gmail' ? 'mailto:' + c.placeholder : '#'}" 
                 target="_blank" 
                 class="aspect-square rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-500 hover:border-indigo-500 transition-all shadow-sm group"
                 title="${c.label}">
                 ${c.iconMode === 'custom' && c.customIconUrl 
                    ? `<img src="${c.customIconUrl}" class="w-6 h-6 object-cover rounded-md">`
                    : `<i class="${getIcon(c.type)} text-xl group-hover:scale-110 transition-transform"></i>`
                 }
              </a>
            `).join('')}
            </div>

          </div>
        </div>
      </div>`;
      
    // Логика UI и Отправки
    var trigger = document.getElementById('hub-trigger');
    var panel = document.getElementById('hub-panel');
    var closeBtn = document.getElementById('hub-close');
    var sendBtn = document.getElementById('hub-send-btn');
    var statusMsg = document.getElementById('hub-status');

    var toggle = function() { panel.classList.toggle('hidden'); };
    if(trigger) trigger.onclick = toggle;
    if(closeBtn) closeBtn.onclick = toggle;

    if(sendBtn) {
        sendBtn.onclick = async function() {
            var contact = document.getElementById('hub-contact').value;
            var message = document.getElementById('hub-message').value;

            if(!contact || !message) {
                statusMsg.textContent = "Заполните все поля";
                statusMsg.className = "text-center text-xs font-bold mt-2 text-red-500 block";
                return;
            }

            // Анимация загрузки
            var originalText = sendBtn.innerHTML;
            sendBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Отправка...';
            sendBtn.disabled = true;

            try {
                var text = "🔥 <b>Новая заявка с сайта</b>\n\n👤 <b>От:</b> " + contact + "\n💬 <b>Сообщение:</b> " + message;
                
                var response = await fetch("https://api.telegram.org/bot" + config.botToken + "/sendMessage", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: config.chatId,
                        text: text,
                        parse_mode: 'HTML'
                    })
                });

                if(response.ok) {
                    statusMsg.textContent = "Успешно отправлено!";
                    statusMsg.className = "text-center text-xs font-bold mt-2 text-emerald-500 block";
                    document.getElementById('hub-contact').value = '';
                    document.getElementById('hub-message').value = '';
                    setTimeout(function() { 
                        statusMsg.classList.add('hidden'); 
                        panel.classList.add('hidden');
                    }, 2000);
                } else {
                    throw new Error('Telegram API Error');
                }
            } catch (e) {
                statusMsg.textContent = "Ошибка отправки.";
                statusMsg.className = "text-center text-xs font-bold mt-2 text-red-500 block";
            } finally {
                sendBtn.innerHTML = originalText;
                sendBtn.disabled = false;
            }
        };
    }

  }, 500);
})();