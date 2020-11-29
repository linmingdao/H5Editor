import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import { Empty } from 'antd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import Editor from './Editor'
import { defaultFormSettings, ComponentType } from './constants'
import {
  FormSettingsProps,
  H5EditorProps,
  H5EditorContext,
  StageItem,
} from './types'
import { getUniformTmplGroupList } from './helper'
import './index.css'
export { renderForm } from './Stage'

export const EditorContext = React.createContext<H5EditorContext>({
  formSettings: { ...defaultFormSettings },
  uniformTmplGroupList: [],
  stageItemList: [],
  collapse: false,
  setCollapse: () => false,
  selectedStageItemIndex: -1,
  emptyImageType: Empty.PRESENTED_IMAGE_SIMPLE,
})

const H5Editor: React.FC<H5EditorProps> = (props) => {
  const {
    stageBgColor,
    stageActiveColor,
    stageDropColor,
    tmplPanelWidth,
    attrPanelWidth,
    attLabelWrapperCol,
    enableBuildingsFormSettings,
    bricks,
    buildings,
    ...restProps
  } = props

  const [formSettings, setFormSettings] = useState<FormSettingsProps>({
    ...defaultFormSettings,
  })
  const [stageItemList, setStageItemList] = useState<StageItem[]>([])
  const [collapse, setCollapse] = useState<boolean>(false)
  const [selectedStageItemIndex, setSelectedStageItemIndex] = useState<number>(
    -1,
  )

  const passedContext: H5EditorContext = {
    stageBgColor,
    stageActiveColor,
    stageDropColor,
    tmplPanelWidth,
    attrPanelWidth,
    attLabelWrapperCol,
    emptyImageType: Empty.PRESENTED_IMAGE_SIMPLE,
    formSettings,
    uniformTmplGroupList: getUniformTmplGroupList(bricks, buildings),
    stageItemList,
    collapse,
    setCollapse,
    selectedStageItemIndex,
    handleStageItemPropsChange(selectedIndex: number, changedValues: any) {
      setStageItemList(
        stageItemList.map((item, index) => {
          if (index === selectedIndex) {
            return {
              ...item,
              props: {
                ...item['props'],
                ...changedValues,
              },
            }
          } else {
            return item
          }
        }),
      )
    },
    handleFormSettingsChange(changedValues: any) {
      setFormSettings({
        ...formSettings,
        ...changedValues,
      })
    },
    handleSelect(selectedIndex: number) {
      setSelectedStageItemIndex(selectedIndex)
      setCollapse(selectedIndex >= 0)
    },
    handleSort(stageItemList) {
      setSelectedStageItemIndex(-1)
      setStageItemList(stageItemList)
    },
    handleDrop(item) {
      if (item.type === ComponentType.Bricks) {
        setStageItemList([...stageItemList, { ...item, id: nanoid() }])
      } else {
        enableBuildingsFormSettings &&
          item.formSettings &&
          setFormSettings({ ...formSettings, ...item.formSettings })
        const composes = item.composes
        setStageItemList([
          ...stageItemList,
          ...composes.map((item: any) => ({
            ...item,
            id: nanoid(),
            type: ComponentType.Bricks,
          })),
        ])
      }
    },
    handleClear() {
      setStageItemList([])
    },
    handleRemove(id) {
      setStageItemList(stageItemList.filter((item) => item.id !== id))
    },
  }

  return (
    <EditorContext.Provider value={passedContext}>
      <DndProvider backend={HTML5Backend}>
        <Editor {...restProps} />
      </DndProvider>
    </EditorContext.Provider>
  )
}

H5Editor.displayName = 'H5Editor'

export default H5Editor
