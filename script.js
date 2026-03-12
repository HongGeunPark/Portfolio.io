/* ── 커스텀 커서 ── */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0; // 마우스 실제 위치
let rx = 0, ry = 0; // 링 현재 위치 (지연 추적용)

// 마우스 이동 시 커서 즉시 이동
document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

// 링은 선형 보간(Lerp)으로 부드럽게 따라옴
(function animRing() {
  rx += (mx - rx) * 0.12; // 매 프레임마다 목표의 12%씩 이동
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

// 인터랙티브 요소에 호버 시 커서 변형
document.querySelectorAll('a, button, .proj-card, .bento-card, .stat-pill, .exp-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    ring.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    ring.classList.remove('hover');
  });
});

/* ── 스크롤 Reveal + 스킬 바 애니메이션 ── */
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 요소 페이드인
      entry.target.classList.add('on');

      // 스킬 바: data-w 속성값으로 너비 채움
      entry.target.querySelectorAll('.sbl-fill').forEach(bar => {
        bar.style.width = bar.dataset.w + '%';
      });

      io.unobserve(entry.target); // 한 번만 실행
    }
  });
}, { threshold: 0.12 }); // 요소가 12% 보이면 발동

document.querySelectorAll('.reveal').forEach(el => io.observe(el));
