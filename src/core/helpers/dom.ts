import { Modal } from "bootstrap";

const hideModal = (modalEl: HTMLElement | null): void => {
  if (!modalEl) {
    return;
  }

  const myModal = Modal.getInstance(modalEl);
  myModal.hide();
};
const openModal = (modalEl: HTMLElement | null): void => {

  console.log("in theope modal");

  console.log(modalEl);
  
  if (!modalEl) {
    return;
  }

  
  const myModal = Modal.getInstance(modalEl);  // null

  console.log(myModal);

  console.log("print my modal");

  
  myModal.show();  // بفرفغ
};

const removeModalBackdrop = (): void => {
  if (document.querySelectorAll(".modal-backdrop.fade.show").length) {
    document.querySelectorAll(".modal-backdrop.fade.show").forEach((item) => {
      item.remove();
    });
  }
};

export { removeModalBackdrop, hideModal,openModal };
