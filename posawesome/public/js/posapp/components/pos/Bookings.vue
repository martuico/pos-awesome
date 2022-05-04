<template>
    <v-container fluid>
      <v-row>
        <v-col
          xl="5"
          lg="5"
          md="5"
          sm="5"
          cols="12"
          class="pos pr-0"
        >
          <div>
            <v-card
              class="selection mx-auto grey lighten-5"
              style="max-height: 75vh; height: 75vh">
                <v-row align="center" class="items px-2 py-1">
                  <v-col
                    v-if="pos_profile.posa_allow_sales_order"
                    cols="9"
                    class="pb-0 mb-2 pr-0"
                  >
                    <Customer></Customer>
                  </v-col>
                  <v-col
                    v-if="!pos_profile.posa_allow_sales_order"
                    cols="12"
                    class="pb-0 mb-2"
                  >
                    <Customer></Customer>
                  </v-col>
              </v-row>
            </v-card>
          </div>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import { evntBus } from '../../bus';
import Customer from '../pos/Customer.vue'

export default {
  components: {
    Customer
  },
  data () {
    return {
      pos_profile: '',
      pos_opening_shift: '',
      customer: '',
    }
  },
  computed: {

  },
  created: function() {
    this.$nextTick(function() {
        this.check_opening_entry()
          evntBus.$on('update_customer', (customer) => {
          this.customer = customer;
        });
    })
  },
  methods: {
    check_opening_entry() {
      return frappe
        .call('posawesome.posawesome.api.posapp.check_opening_shift', {
          user: frappe.session.user,
        })
        .then((r) => {
          if (r.message) {
            this.pos_profile = r.message.pos_profile;
            this.pos_opening_shift = r.message.pos_opening_shift;
            this.get_offers(this.pos_profile.name);
            evntBus.$emit('register_pos_profile', r.message);
            evntBus.$emit('set_company', r.message.company);
            console.info('LoadPosProfile');
          } else {
            this.create_opening_voucher();
          }
        });
    },
  },
}
</script>