<template>
  <ui-snackbar
    :modelValue="bannerToggle"
    :message="message"
    :action-type="1"
    :action-button-text="'Close'"
    position="top"
    @closed="(e) => triggerBanner({ message: '', type: '', toggle: false })"
  />

</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      bannerToggle: (state) => state.snackBarModule.bannerToggle,
      message: (state) => state.snackBarModule.message,
      type: (state) => state.snackBarModule.type,
    }),
  },
  methods: {
    ...mapActions({
      triggerBanner: "snackBarModule/triggerBanner",
    }),
  },
};
</script>

