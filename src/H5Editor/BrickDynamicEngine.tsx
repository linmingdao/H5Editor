import React, { useMemo, memo, FC, useContext } from "react";
import Loadable from "react-loadable";
import { EditorContext } from "./index";

const BrickDynamicFunc = (loader: any, componentName: string) => {
  return Loadable({
    loader: loader(componentName),
    loading() {
      return <div>Loading...</div>;
    },
  });
};

type BrickDynamicEngineType = {
  mode: string;
  componentName: string;
  componentProps: any;
  onValuesChange: (changedValues: any, allValues: any) => void;
};

const BrickDynamicEngine = memo((props: BrickDynamicEngineType) => {
  const { uniformTmplGroupList } = useContext(EditorContext);
  const loader = uniformTmplGroupList[0]["loader"];
  const { mode, componentName, componentProps, onValuesChange } = props;
  const convertedProps = { ...componentProps, mode, onValuesChange };

  const Dynamic = useMemo(() => {
    return (BrickDynamicFunc(loader, componentName) as unknown) as FC<
      BrickDynamicEngineType
    >;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Dynamic {...convertedProps} />;
});

BrickDynamicEngine.displayName = "BrickDynamicEngine";

export default BrickDynamicEngine;
