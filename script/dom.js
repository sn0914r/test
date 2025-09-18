class DOM {
  constructor() {
    this.initializeFooter();
  }

  initializeFooter() {
    const address = document.getElementById("footer-address");
    const phone = document.getElementById("footer-telephone");
    const mail = document.getElementById("footer-gmail");
    const socialMedia = document.getElementById("social-media-container");

    let media = [];
    for (let [x, y] of Object.entries(DATA.socialMedia)) {
      media.push(
        `<a href=${y} class="btn btn-outline-warning"><i class="bi bi-${x}"></i></a>`
      );
    }

    address.append(` ${DATA.address}`);
    phone.append(` ${DATA.phone}`);
    mail.append(` ${DATA.mail}`);
    socialMedia.innerHTML = media.join("");
  }
}

const dom = new DOM();
