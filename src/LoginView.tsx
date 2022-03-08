import * as React from 'react';

import { View } from '@miq/componentjs';
import Form, { useForm } from '@miq/formjs';

export default function LoginView() {
  const form = useForm({ first_name: '' });
  const [step, setStep] = React.useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(step + 1);
  };
  return (
    <View>
      <div className="d-grid grid-md-2 gap-2">
        <div className="d-none d-md-block">iphone</div>

        <div className="p-4">
          <div className="mb-3">
            <h1 className="fw-normal">nico</h1>
          </div>

          <ul className="mb-4">
            <li> Set goals and track your smoking habits daily</li>
          </ul>

          <Form context={form} onSubmit={handleSubmit}>
            <div className="mb-2">
              <Form.Text required name="first_name" placeholder="What's your first name ..." />
            </div>

            <div className="d-flex">
              <Form.Submit
                value={'Get started »'}
                className="btn-primary btn-md mr-auto"
                style={{ marginLeft: 'auto' }}
              />
            </div>
          </Form>
        </div>
      </div>
    </View>
  );
}
