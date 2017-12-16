import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Switch from 'material-ui/Switch';
import Tooltip from 'material-ui/Tooltip';

import Delete from './Delete';
import Update from './Update';

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
