import React, { Fragment, useEffect, useState } from 'react';
import { Header, Grid, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import PhotoWigetDropZone from './PhotoWidgetDropZone';
import PhotoWidgetCropper from './PhotoWidgetCropper';

interface IProps {
    uploadPhoto: (files: Blob) => void;
    loading: boolean
}
const PhotoUploadWidget: React.FC<IProps> = ({ uploadPhoto, loading }) => {
    const [files, setFiles] = useState<any[]>([])
    const [image, setImage] = useState<Blob | null>(null)
    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview))
        }
    })
 
    return (
        <Fragment>
            <Grid>
                <Grid.Row />
                <Grid.Column width={4}>
                    <Header color='teal' sub content='Step 1 - Add Photo' />
                    <PhotoWigetDropZone setFiles={setFiles} />
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                    <Header sub color='teal' content='Step 2 - Resize image' />
                    {files.length > 0 && <PhotoWidgetCropper setImage={setImage} imagePreview={files[0].preview} />}
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                    <Header sub color='teal' content='Step 3 - Preview & Upload' />
                    {files.length > 0 &&
                        <Fragment>
                            <div className='img-preview' style={{ minHeight: '200px', overflow: 'hidden' }} />
                            <Button.Group widths={2}>
                                <Button basic positive icon='check' loading={loading} onClick={
                                    ()=>uploadPhoto(image!)
                                }/>
                                <Button basic negative icon='close' disabled={loading} onClick={
                                    ()=>setFiles([])
                                }/>

                            </Button.Group>
                        </Fragment>



                    }
                </Grid.Column>
            </Grid>
        </Fragment>
    );
};
export default observer(PhotoUploadWidget);
