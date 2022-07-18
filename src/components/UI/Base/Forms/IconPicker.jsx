import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const IconPicker = props => {
	const iconList = [
		'plane',
		'bell',
		'otter',
		'dog',
		'globe',
		'shuttle-space',
		'bus',
		'car',
		'building',
		'building-columns',
		'church',
		'house',
		'landmark',
		'school',
		'book',
		'box-archive',
		'briefcase',
		'bullseye',
		'calendar',
		'compass',
		'envelope',
		'glasses',
		'pen-nib',
		'mug-saucer',
		'phone',
		'wallet',
		'faucet',
		'fire-burner',
		'dollar-sign',
		'gift',
		'hand-holding-heart',
		'ribbon',
		'baby',
		'gamepad',
		'puzzle-piece',
		'graduation-cap',
		'shirt',
		'poo',
		'signal',
		'hammer',
		'screwdriver-wrench',
		'toolbox',
		'brush',
		'camera',
		'computer',
		'headphones',
		'mobile',
		'tv',
		'music',
		'bolt',
		'ticket',
		'bowl-food',
		'wine-glass',
		'apple-whole',
		'chess',
		'heart',
		'couch',
		'shower',
		'utensils',
		'road',
		'bicycle',
		'cart-shopping',
		'scale-balanced',
		'earth-americas',
		'dumbbell',
		'spa',
		'mountain',
		'house-medical',
		'stethoscope'
	]

	return (
		<div className="custom-radios-icon" onChange={event => props.setCheck(event.target.value)}>
			{iconList.map((el, index) => {
				return (
					<div key={index}>
						<input type="radio" id={`icon-${index}`} name="icon" value={el} defaultChecked={props.iconPicked == el} />
						<label htmlFor={`icon-${index}`}>
							<span className={props.colorPicked}>
								<FontAwesomeIcon icon={el} color='white' />
							</span>
						</label>
					</div>
				)
			})}
		</div>
	)
}

export default IconPicker