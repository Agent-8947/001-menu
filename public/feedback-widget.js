(function () {
  // 1. Конфигурация (уже вшита)
  const config = JSON.parse(decodeURIComponent(escape(atob("eyJpZCI6InctaTRveDZheTFvIiwibmFtZSI6IkRlZmF1bHQgV2lkZ2V0IiwidGl0bGUiOiJOZWVkIGhlbHA/IiwiZGVzY3JpcHRpb24iOiJDaG9vc2UgeW91ciBwcmVmZXJyZWQgY29udGFjdCBtZXRob2QgYW5kIHdlIHdpbGwgZ2V0IGJhY2sgdG8geW91LiIsImNoYW5uZWxzIjpbeyJ0eXBlIjoidGVsZWdyYW0iLCJsYWJlbCI6IlRlbGVncmFtIiwiZW5hYmxlZCI6dHJ1ZSwicGxhY2Vob2xkZXIiOiJ1c2VybmFtZSIsImljb25Nb2RlIjoiZGVmYXVsdCJ9XSwidGhlbWVDb2xvciI6IiM0ZjQ2ZTUiLCJwb3NpdGlvbiI6ImJvdHRvbS1yaWdodCJ9"))));
  
  // 2. Добавляем стили и иконки, если их нет
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const fa = document.createElement('link');
    fa.rel = 'stylesheet';
    fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(fa);
  }

  // 3. Создаем кнопку виджета вручную (так как бандл не грузится)
  const btn = document.createElement('div');
  btn.innerHTML = `
    <div id="feedback-hub-floating-btn" style="position:fixed; bottom:20px; right:20px; z-index:9999; cursor:pointer;">
      <div style="background:${config.themeColor}; width:60px; height:60px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; box-shadow:0 4px 12px rgba(0,0,0,0.2);">
        <i class="fas fa-comments" style="font-size:24px;"></i>
      </div>
    </div>
  `;
  document.body.appendChild(btn);

  // 4. Обработка клика
  btn.onclick = function() {
    const username = config.channels[0].placeholder;
    window.open(`https://t.me/${username}`, '_blank');
  };

  console.log('Feedback Widget: Simple Mode Activated');
})();
