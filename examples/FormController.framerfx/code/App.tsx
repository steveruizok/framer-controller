import { Data, animate, Override, Animatable } from 'framer'
import './index.css'
import { DateController } from '../../../lib'

const test = new DateController({
	now: new Date(),
	today: '2-12-15',
	tomorrow: '2-15-20',
})

export const DateTest: Override = () => {
	return {
		$textLabel: test.dates.today,
		$errorText: test.now.toString(),
	}
}

setTimeout(() => {
	test.data.today = test.data.today.add(1, 'day')
}, 2000)
