<?php

namespace App\Trait;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

trait UploadImageTrait
{
    /**
     * Handle the image upload process.
     *
     * @param \Illuminate\Http\Request $request
     * @param string $fieldName
     * @param string $directory
     * @param string|null $existingFilePath
     * @return string|null
     */
    public function uploadImage($request, $fieldName = 'image', $directory = 'images', $existingFilePath = null)
    {
        if ($request->hasFile($fieldName) && $request->file($fieldName)->isValid()) {
            // Delete the existing file if it exists
            if ($existingFilePath && File::exists(public_path($existingFilePath))) {
                File::delete(public_path($existingFilePath));
            }
            $extension = $request->file($fieldName)->getClientOriginalExtension();
            $fileName = Str::uuid() . '.' . $extension;
            $path = $request->file($fieldName)->move(public_path($directory), $fileName);
            return $directory . '/' . $fileName;
        }
        return null;
    }

    public function deleteImage($image)
    {
        if ($image && File::exists(public_path($image))) {
            File::delete(public_path($image));
        }
        return null;
    }
}
