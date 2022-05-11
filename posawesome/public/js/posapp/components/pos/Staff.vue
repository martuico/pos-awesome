<template>
    <div>
        <v-autocomplete
            dense
            clearable
            auto-select-first
            outlined
            color="indigot"
            :label="frappe._('Staff Incharge')"
            v-model="staff"
            :items="staffs"
            item-text="employee_name"
            item-value="name"
            background-color="white"
            :no-data-text="__('Staff not found')"
        >
            <template v-slot:item="data">
                <template>
                    <v-list-item-content>
                        <v-list-item-title
                            class="indigo--text subtitle-1"
                            v-html="data.item.prefered_email"/>
                        <v-list-item-subtitle v-html="data.item.name" />
                        <v-list-item-subtitle v-html="data.item.employee_name" />
                    </v-list-item-content>
                </template>
            </template>
        </v-autocomplete>
    </div>
</template>

<script>
import { evntBus } from '../../bus';

export default {
    data: () => ({
        pos_profile: '',
        staffs: [],
        staff: '',
        readonly: false
    }),
    computed: {},
    created() {
        this.$nextTick(() => {
            this.fetch_staffs()
        })
    },
    watch: {
        staff(val) {
            const selected = this.staffs.filter(staf => staf.name === val)

            evntBus.$emit('update_staff', {
                employee: val,
                employee_name: selected[0].employee_name
            })
        }
    },
    methods: {
        fetch_staffs() {
            const vm = this
            frappe.call({
                method: 'posawesome.posawesome.api.posapp.get_staffs_list',
                async: false,
                callback(r) {
                    const message = r.message
                    if(!r.exc) {
                        vm.staffs = message
                    }
                }
            })
        }
    },
}
</script>