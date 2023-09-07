const allPlugins = (on) => {
    on('task', {
      'db:teardown': () => {
        const teardown = require('../../db/teardown.js')
        return teardown()
      },
      'db:seed': () => {
        const seed = require('../../db/seed.js')
        return seed()
      },
    })
}

export default allPlugins