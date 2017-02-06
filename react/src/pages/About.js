import React from 'react';
import { Collapsible, CollapsibleItem } from 'react-materialize';

const About = () => {
  return (
    <div>
      <ul>
        <li className='aboutItem'></li>
      </ul>
      <div>
        <Collapsible popout>
          <CollapsibleItem header='Currency Exchange'>
            Currency Exchange gets up-to-date global currency exchange rates.
          </CollapsibleItem>
          <CollapsibleItem header='Convert $'>
            Use the 'Convert $' form to compare the rates between any two currencies. Select a 'base currency' and 'comparitor currency' using the autocomplete form and clicking on one of the listed items.
            The form will default to a rate of 1 for the base. You can modify either the base or comparitor currency or rates thereof for immediate updates.
          </CollapsibleItem>
          <CollapsibleItem header='All Rates'>
            The 'All Rates' page displays a list of all exchange rates for any given base currency. It defaults to 'USD' but may be swapped with any of the listed currencies by clicking on those displayed in the table.
            The table is sortable by clicking on any of the column headers.
          </CollapsibleItem>
        </Collapsible>
      </div>
    </div>
  )
}

export default About;
