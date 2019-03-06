import * as React from 'react'
import { Override } from 'framer'
import { User } from './canvas'

import { FetchController } from '../../../lib'

const controller = new FetchController({
	url: 'https://jsonplaceholder.typicode.com/users',
})

export const isUserContainer: Override = () => ({
	children: controller.data.map(({ name, username, email }, i) => (
		<User
			$name={name}
			$username={username}
			$email={email}
			top={16 + i * 114}
			width={343}
			left={16}
		/>
	)),
})

export const isLoadingText: Override = () => ({
	opacity: controller.loading ? 1 : 0,
})
