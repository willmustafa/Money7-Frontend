import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const ColorPicker = props => {

	const availableColors = [
		'bg-primary',
		'bg-secondary',
		'bg-success',
		'bg-info',
		'bg-warning',
		'bg-danger',
		'bg-dark',
	]
	return (
		<div className="custom-radios" onChange={event => props.setCheck(event.target.value)}>
			<div>
				<input type="radio" id={'color-0'} name="color" value={availableColors[0]} defaultChecked={props.colorPicked == availableColors[0]} />
				<label htmlFor={'color-0'}>
					<span className={availableColors[0]}>
						<FontAwesomeIcon icon='check' color='white' />
					</span>
				</label>
			</div>
			<div>
				<input type="radio" id={'color-2'} name="color" value={availableColors[2]} defaultChecked={props.colorPicked == availableColors[2]} />
				<label htmlFor={'color-2'}>
					<span className={availableColors[2]}>
						<FontAwesomeIcon icon='check' color='white' />
					</span>
				</label>
			</div>
			<div>
				<input type="radio" id={'color-3'} name="color" value={availableColors[3]} defaultChecked={props.colorPicked == availableColors[3]} />
				<label htmlFor={'color-3'}>
					<span className={availableColors[3]}>
						<FontAwesomeIcon icon='check' color='white' />
					</span>
				</label>
			</div>
			<div>
				<input type="radio" id={'color-4'} name="color" value={availableColors[4]} defaultChecked={props.colorPicked == availableColors[4]} />
				<label htmlFor={'color-4'}>
					<span className={availableColors[4]}>
						<FontAwesomeIcon icon='check' color='white' />
					</span>
				</label>
			</div>
			<div>
				<input type="radio" id={'color-5'} name="color" value={availableColors[5]} defaultChecked={props.colorPicked == availableColors[5]} />
				<label htmlFor={'color-5'}>
					<span className={availableColors[5]}>
						<FontAwesomeIcon icon='check' color='white' />
					</span>
				</label>
			</div>
			<div>
				<input type="radio" id={'color-6'} name="color" value={availableColors[6]} defaultChecked={props.colorPicked == availableColors[6]} />
				<label htmlFor={'color-6'}>
					<span className={availableColors[6]}>
						<FontAwesomeIcon icon='check' color='white' />
					</span>
				</label>
			</div>
		</div>
	)
}

export default ColorPicker