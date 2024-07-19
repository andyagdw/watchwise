import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import styles from "./SeasonsDropdown.module.css"

export default function SeasonsDropdown({ data }) {

    const [accordionId, setAccordionId] = useState('')

    useEffect(() => {
        const id = uuidv4()
        setAccordionId(id)
    }, [])

    const episodes = data?.episodes  // An array of episodes
    const buttonId = `heading-${accordionId}`
    const collapseId = `collapse-${accordionId}`
    const collapseTarget = `#${collapseId}`

    return (
        <div className={["card mb-1 border border-primary", styles.cardSeasonsDiv].join(" ")}>
            <div className="card-header" id={buttonId}>
                <h4 className="mb-0">
                    <button
                        className="btn w-100 text-start text-primary"
                        data-bs-toggle="collapse"
                        data-bs-target={collapseTarget}
                        aria-expanded="true"
                        aria-controls={collapseId}>
                        <span className='whiteText'>Season {data?.season}</span>
                    </button>
                </h4>
            </div>
            <div
                id={collapseId}
                className="collapse hide"
                aria-labelledby={buttonId}
                data-bs-parent="#accordion">
                <div className="card-body">
                    <ul className='list-group'>
                        {episodes.map(item => {
                            return (
                              <li
                                key={item?._id}
                                className={["list-group-item whiteText p-3", styles.seasonsLi].join(" ")}
                              >
                                S{item?.season_number} E{item?.episode_number}
                              </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
  )
}