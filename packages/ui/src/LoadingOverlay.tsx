import { LoadingOverlay as Overlay } from '@mantine/core';


export function LoadingOverlay() {
  return (
    <div className=" flex flex-col justify-center items-center flex-1">
      <Overlay
        visible={true}
        zIndex={1000}
        overlayProps={{ radius: 'sm',blur: 2 }}
        loaderProps={{ color: '#632852',type: 'bars' }}
      />
    </div>)

}
