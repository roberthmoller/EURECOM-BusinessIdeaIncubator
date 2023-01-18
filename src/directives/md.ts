import {marked} from "marked"

export const md = {
    mounted: (el: any) => {
        el.innerHTML = marked(el.innerHTML)
    }
}
