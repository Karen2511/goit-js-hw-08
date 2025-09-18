const images = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

// 3 — Побудова розмітки елементів галереї за шаблоном
const galleryEl = document.querySelector(".gallery");

const markup = images
  .map(
    ({ preview, original, description }) => `
    <li class="gallery-item">
    <a class="gallery-link" href="${original}" aria-label="Переглянути велике зображення: ${description}">
    <img
    class="gallery-image"
    src="${preview}"
    data-source="${original}"
    alt="${description}"
    loading="lazy"
    />
    </a>
    </li>
    `
  )
  .join("");

galleryEl.insertAdjacentHTML("beforeend", markup);

// 5 — Делегування подій на контейнері .gallery
let activeInstance = null; // збереження активного інстансу модалки для Esc

galleryEl.addEventListener("click", onGalleryClick);

function onGalleryClick(evt) {
  // Якщо клік не по <a.gallery-link> або <img.gallery-image> — нічого не робимо
  const link = evt.target.closest(".gallery-link");
  if (!link || !galleryEl.contains(link)) return;

  // Забороняємо перехід за посиланням (завантаження зображення)
  evt.preventDefault();

  const img = link.querySelector(".gallery-image");
  const largeSrc = img.dataset.source;
  const alt = img.alt || "";

  // 5 — Поточне посилання на велике зображення у консоль (для перевірки)
  console.log("large image:", largeSrc);

  // 7–8 — Створення та відкриття модального вікна з великим зображенням
  activeInstance = basicLightbox.create(
    `
      <img 
        src="${largeSrc}" 
        alt="${alt}" 
        style="width:1112px; height:640px; object-fit:cover;" 
      />
    `,
    {
      onShow: (instance) => {
        document.addEventListener("keydown", onKeyDown);
      },
      onClose: (instance) => {
        document.removeEventListener("keydown", onKeyDown);
      },
    }
  );

  activeInstance.show();
}

function onKeyDown(e) {
  if (e.key === "Escape" && activeInstance) {
    activeInstance.close();
    activeInstance = null;
  }
}
