// eslint-disable-next-line no-unused-vars
const app = new Vue({
  el: '#app',
  data: {
    scroller: scrollama(),
    width: 500,
    height: 300,
    step: 0,
    progress: 0,
    margin: 64,
    data: [] 
  },
  mounted() {
    this.scroller.setup({
        step: '.scrolly article .step',
        offset: 0.5,
        progress: true,
        debug: false
      }).onStepEnter(this.onEnter)
      .onStepProgress(this.onProgress)
      .onStepExit(this.onExit)

      d3.csv('../assets/data/avocado.csv').then(data => {
        this.data = data.map(d => {
          return {
            city: d.city,
            price: +d.price,
            volume: +d.volume
          }
        })
        console.log(this.data);
      })

    this.resize()
    window.addEventListener('resize', this.resize)
  },
  computed: {
    innerWidth() {
      return this.width - this.margin * 2
    },
    innerHeight() {
      return this.height - this.margin * 2
    }
  },
  methods: {
    resize() {
      const bounds = this.$refs.figure.getBoundingClientRect()
      this.width = bounds.width
      this.height = bounds.height
      this.scroller.resize()
    },
    onEnter(step) {
      console.log('enter', step)
      this.step = step.index
    },
    onProgress(step) {
      console.log('progress', step)
      this.step = step.index
      this.progress = step.progress
    },
    onExit(step) {
      console.log('exit', step)
      this.step = step.index
    }
  }
})