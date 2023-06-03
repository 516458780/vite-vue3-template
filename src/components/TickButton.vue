<template>
  <div class="tick-button" :style="buttonStyle" @click="onClick">
    <van-icon class="tick-icon" v-show="modelValue" name="success" :size="tickSize" />
  </div>
  {{ $store.main.token }}
</template>

<script>
export default {
  name: 'TickButton',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    size: {
      default: '16px'
    },
    tickSize: {
      default: '13px'
    }
  },
  emits: ['update:modelValue'],
  setup () {
    return {
    }
  },
  computed: {
    test () {
      return this.$store.main.token
    },
    buttonStyle () {
      return {
        '--size': this.size
      }
    }
  },
  mounted () {
    const that = this
    that.$nextTick(() => {
    })
  },
  methods: {
    onClick () {
      const newValue = !this.modelValue
      this.$emit('update:modelValue', newValue)
    }
  }
}
</script>

<style scoped>
.tick-button {
  --size: 20px;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #999999;
}

.tick-icon {
  margin-top: 10%;
}
</style>
