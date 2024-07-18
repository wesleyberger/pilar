<template>
  <Details :id="id" />
</template>

<script>
import Details from '../components/DetailsContent.vue';

export default {
  components: {
    Details
  },
  data() {
    return {
      id: this.$route.params.id
    };
  }
};
 
</script>