/*********************************************************************
 * Copyright © 2020 - 2021 HsiangYee All Rights Reserved.
 * 著作權 © 2020 - 2021 HsiangYee 版權所有
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