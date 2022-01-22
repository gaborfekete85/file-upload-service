#/bin/bash
env="dev"
while (( "$#" )); do
    case $1 in
        -e | --environment)
        	env=$2
        	shift
        ;;
    esac
    shift
done

#Build
#./gradlew clean build
#npm run build

echo "Environment: $env"
#echo "Deploying from values-$env-file-upload-service.yaml"
#exit 0;

#Docker image push
docker image build -t crime/file-upload-service .
docker tag crime/file-upload-service:latest gabendockerzone/file-upload-service:latest
docker push gabendockerzone/file-upload-service:latest

#docker login

#Helm Redeploy
cd ../../pipeline/K8S
helm delete file-upload-service -n crime
echo "Deploying from values-$env-file-upload-service.yaml"
helm install -f service/values-$env-file-upload-service.yaml file-upload-service ./service -n crime