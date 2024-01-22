'use client';
import { uploadToS3 } from '@/lib/s3';
import { Inbox, Loader2 } from 'lucide-react';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from './ui/use-toast';

const FileUpload = () => {
    const [uploading, setUploading] = React.useState(false);
   
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { 'application/pdf': ['.pdf'] },
        maxFiles: 1,
        onDrop: async (acceptedFiles) => {
            console.log(acceptedFiles);
            const file = acceptedFiles[0];
            if (file.size > 10 * 1024 * 1024) {
                // bigger than 10mb
                toast({title: 'Error', description: 'File too large'});
                return;
            }

            try {
                setUploading(true);
                const data = await uploadToS3(file);
                if (!data?.file_key || !data?.file_name) {
                    toast({title: 'Error', description: 'Something went wrong'});
                    return;
                }
                
                // DO SOMETHING WITH THE FILE

                console.log(data);
            } catch (error) {
                console.log(error);
                toast({title: 'Error', description: 'File too large'});
            } finally {
                setUploading(false);
            }
        },
    });
    return (
        <div className='p-2 bg-input rounded-xl'>
            <div
                {...getRootProps({
                    className: 'border-dashed border-2 border-ring rounded-xl cursor-pointer bg-input py-8 flex justify-center items-center flex-col',
                })}
            >
                <input {...getInputProps()} />
                {uploading ? (
                    <>
                        <Loader2 className='w-10 h-10 text-foreground animate-spin' />
                        <p className='mt-2 text-sm'>Uploading file...</p>
                    </>
                ) : (
                    <>
                        <Inbox className='w-10 h-10 text-foreground' />
                        <p className='mt-2 text-sm'>Drop File Here</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
