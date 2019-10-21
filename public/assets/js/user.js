// 当表单发生提交行为的时候，获取表单，为表单设置事件
$('#userForm').on('submit', function() {
    // 获取用户在提交表单中输入的值，并将其格式化成字符串
    var formData = $(this).serialize();
    // 向服务器发送请求添加用户
    $.ajax({
        type: "post",
        url: "/users",
        data: formData,
        success: function(response) {
            // 请求成功的话，刷新页面
            location.reload();
        },
        error: function(response) {
            alert('用户添加失败');
        }
    });
    // 阻止表单的默认提交行为
    return false;
})

// 当用户上传头像时，给上传头像按钮添加change事件
$('#avatar').on('change', function() {
    // new一个formData进行二进制操作
    var formData = new FormData();
    // 在formdata中添加上传了的文件
    formData.append('avatar', this.files[0]);

    // 向服务器发送请求实现头像的预览和文件地址的上传
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // 告诉$.ajax方法不要设置请求参数的数据类型
        contentType: false,
        success: function(response) {
            console.log(response);
            // 实现头像的预览效果
            $('#preview').attr('src', response[0].avatar);
            // 在隐藏域中存储文件的地址
            $('hiddenAvatar').val(response[0].avatar);
        }
    });
})