class DOM {
  constructor() {
    console.log("DOM object inistiaed");
  }

  initializeTabBtns() {
    const tabBtns = document.querySelectorAll(".tab-btn");
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(tab => tab.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute("data-filter");
            filterVehicals(filter,)
        })
    })

  }
}
