import InputFormSign from "@/components/InputFormSign"

const Page = () => {
  return (
    <div>
      <form className="space-y-4">
        <InputFormSign title={`Old Password`} type={`password`} />
        <InputFormSign title={`New Password`} type={`password`} />
        <InputFormSign title={`Conform New Password`} type={`password`} />
        <div>
          <button className="font-medium text-base w-full bg-green-500 hover:bg-green-600 h-10 transition rounded-lg text-white">Update Now</button>
        </div>
      </form>
    </div>
  )
}

export default Page