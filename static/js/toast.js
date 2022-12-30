/*********************************************************************
 * Copyright © 2020 - 2023 HsiangYee All Rights Reserved.
 * 著作權 © 2020 - 2023 HsiangYee 版權所有
 * 非經同意不得翻印轉載或以任何方式重製，以免侵犯臺灣智慧財產權須負責刑法與民法
 * 君子請自重 勿淪為小人，請勿以身試法，留下前科
 *********************************************************************/

class Toast {
    constructor() {
        this.swal = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500
        });
    }

    fire(icon, message) {
        this.swal.fire({
            icon: icon,
            title: `<div class="ml-3">${message}</div>`
        });
    }
}

const toast = new Toast();