<template>
    <template v-for="(item, index) in items">
        <tr v-if="items && items.length > 0 && index <= limit">
            <td class="tdd price text-dark" :style="'color:' + color">
                <span>{{ item[0] }}</span>
            </td>
            <td class="tdd quantity text-dark">
                <span>{{ item[1] }}</span>
            </td>
            <td class="tdd btc text-dark">
                <span
                    >{{ item[2] }}
                    <div
                        :class="'percent_' + type"
                        :style="'width:' + item[3] + 'px'"
                    ></div
                ></span>
            </td>
        </tr>
    </template>
</template>
<script>
export default {
    name: ["ListItem"],
    props: ["data", "type", "color", "limit", "showHalf"],
    computed: {
        items() {
            if (this.showHalf) {
                if (this.type === "ask") {
                    return this.data.slice(-this.limit / 2); // Show last 10 items of asks
                } else if (this.type === "bid") {
                    return this.data.slice(0, this.limit / 2); // Show first 10 items of bids
                }
            } else {
                return this.data.slice(0, this.limit); // Show 20 items
            }
        },
    },
};
</script>
