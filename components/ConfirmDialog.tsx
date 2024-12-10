import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

export default function ConfirmDialog({
  title,
  message,
  isVisible,
  onConfirm,
  onHide,
}: {
  title: string;
  message: string;
  isVisible: boolean;
  onConfirm: () => void;
  onHide: () => void;
}) {
  const actions = (
    <section className="flex">
      <Button label="Confirm" className="flex-1" onClick={onConfirm} />
      <Button
        text
        label="Cancel"
        className="flex-1"
        severity="danger"
        onClick={onHide}
      />
    </section>
  );

  return (
    <Dialog
      className="md:w-5 w-11"
      header={title}
      visible={isVisible}
      onHide={onHide}
      modal
      footer={actions}
    >
      <p>{message}</p>
    </Dialog>
  );
}
