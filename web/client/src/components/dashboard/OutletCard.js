import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Switch from 'material-ui/Switch';
import Tooltip from 'material-ui/Tooltip';
import RC2 from 'react-chartjs2';

import Delete from './Delete';
import Update from './Update';

const data = {
  labels: ['20h30', '', '20h35', '', '20h40', '', '20h45', '', '20h50', '', '20h55', '', '21h00'],
  datasets: [
    {
      label: 'Consommation',
      fill: false,
      lineTension: 0.2,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40, 96, 87, 28, 74, 12, 54, 27],
    }
  ]
};

const OutletCard = ({ alias, handleChangeStateOutlet, handleDeleteOutlet, handleUpdateOutlet, id, state }) => (
  <Card>
    <CardHeader
      action={
        <Tooltip title="Allumer/Éteindre la prise" placement="bottom">
          <Switch
            checked={state}
            onChange={handleChangeStateOutlet}
            aria-label="Allumer/Éteindre la prise"
          />
        </Tooltip>
      }
      title={(alias) ? alias : id}
      subheader={id}
    />
    <CardContent>
      <RC2 data={data} type='line' />
    </CardContent>
    <CardActions disableActionSpacing>
      <Update initialValues={{alias}} id={id} onSubmit={handleUpdateOutlet} />

      <Delete id={id} handleDelete={handleDeleteOutlet} />
    </CardActions>
  </Card>
);

OutletCard.PropTypes = {
  alias: PropTypes.string.isRequired,
  handleChangeStateOutlet: PropTypes.func.isRequired,
  handleDeleteOutlet: PropTypes.func.isRequired,
  handleUpdateOutlet: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default OutletCard;
