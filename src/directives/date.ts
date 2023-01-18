import moment from "moment";

export const date = {
    mounted: (el: any, binding: any) => {
        el.innerHTML = moment(binding.value).format('MMMM Do YYYY, h:mm:ss a');
    }
}
