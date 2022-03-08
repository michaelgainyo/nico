import * as React from 'react';

import './monoloq.scss';

import { Button, Icons, View } from '@miq/componentjs';
import Form, { useForm } from '@miq/formjs';
import { appEmitter } from '../appStore';

export default function MonoloqView() {
  return (
    <View back="../" headerCN="p-1">
      <div className="vw-100"></div>
    </View>
  );
}

export const EntryAddForm = () => {
  const form = useForm({ text: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form.values);

    // appEmitter.addEntry(form.values)
  };

  return (
    <div className="entry-add-form d-flex align-items-end">
      <div className="">
        <Button>
          <Icons.ArrowLeft />
        </Button>
      </div>
      <Form context={form} onSubmit={handleSubmit} className="flex-1 ms-1" tabIndex={0}>
        <div className="d-flex align-items-end">
          <div className="flex-1">
            <Form.TextAreaX required name="text" placeholder="How are you feeling ..." maxLength={260} />
          </div>

          <div className="p-1">
            <Form.Submit className="btn-submit btn-primary-3 btn-md">
              <Icons.CloudArrowUp />
            </Form.Submit>
          </div>
        </div>
      </Form>
    </div>
  );
};
