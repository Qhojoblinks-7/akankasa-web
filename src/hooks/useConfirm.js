import { useState, useCallback } from 'react';
import ConfirmationDialog from '../components/ui/ConfirmationDialog';

export function useConfirm(options = {}) {
  const [state, setState] = useState({ open: false, onConfirm: null });

  const ask = useCallback((overrides = {}) => {
    return new Promise((resolve) => {
      setState({
        open: true,
        onConfirm: () => {
          setState({ open: false, onConfirm: null });
          resolve(true);
        },
        ...overrides,
      });
    });
  }, []);

  const close = useCallback(() => {
    setState({ open: false, onConfirm: null });
  }, []);

  const Dialog = useCallback(
    (props) => (
      <ConfirmationDialog
        open={state.open}
        onClose={close}
        onConfirm={state.onConfirm}
        {...options}
        {...props}
      />
    ),
    [state.open, state.onConfirm, close, options]
  );

  return { ask, close, Dialog };
}

export default useConfirm;
