import { View } from '@miq/componentjs';
import Form, { useForm } from '@miq/formjs';
import * as React from 'react';
import { AppCtx, appEmitter, IAppCtxValue } from '../appStore';

const initialSetting = { avg_day_count: '', last_cig_dt: '', pack_cig_count: '', pack_cig_cost: '' };

export default function Settings() {
  const { state } = React.useContext<IAppCtxValue>(AppCtx);
  const form = useForm(initialSetting);

  const updateSetting = (e: React.FormEvent) => {
    e.preventDefault();

    appEmitter.setSetting(form.values);
  };

  return (
    <View title="Settings">
      <Form context={form} onSubmit={updateSetting}>
        <Form.Field label="Approximately how many cigarettes do you smoke daily?">
          <Form.Text required type="number" name="avg_day_count" min={0} max={100} />
        </Form.Field>

        <Form.Submit value="Save" className="btn-primary" />
      </Form>
    </View>
  );
}
