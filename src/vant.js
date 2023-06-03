
import { Button, Field, CellGroup, RadioGroup, Radio, Icon } from 'vant'
import 'vant/lib/index.css'

const initVant = (app) => {
  app
    .use(Button)
    .use(Field)
    .use(CellGroup)
    .use(RadioGroup)
    .use(Radio)
    .use(Icon)
}

export default initVant
