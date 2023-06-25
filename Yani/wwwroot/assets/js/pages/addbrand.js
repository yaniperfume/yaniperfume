$(document).ready(function () {
    $('#errorMessage').hide();
    $('#addImage').click(function () {
        // Create an input element of type file
        var input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        // When the file is selected
        input.onchange = function () {
            // Get the selected file
            var file = input.files[0];

            // Check if the file size is less than or equal to 1MB
            if (file.size > 1 * 1024 * 1024) {
                // Show the error message
                $('#errorMessage').show();
                return;
            } else {
                // Hide the error message
                $('#errorMessage').hide();
            }

            // Read the file as a data URL
            var reader = new FileReader();
            reader.readAsDataURL(file);

            // When the file is loaded
            reader.onload = function () {
                // Set the data URL as the source of the image
                $('#displayImage').attr('src', reader.result);
                // Set the data URL as the value of the hidden input
                $('#ImageData').val(reader.result);
            }
        }

        // Trigger a click event on the input element to open the file selector dialog
        $(input).trigger('click');
    });

    $('#removeImage').click(function () {
        // Set the source of the image to the default image
        $('#displayImage').attr('src', '/images/avatar.png');
        // Set the value of the hidden input to an empty string
        $('#ImageData').val('');
    });

    $('a[type="submit"]').click(function () {
        $('form').submit();
    });
});